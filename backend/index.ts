import { router, json, db, increment, requireAuth, requireAdminEmailAllowlist } from '@appdeploy/sdk';

const ADMIN_EMAILS = ['carlosd.solano98@gmail.com'];
const TOTALS_TABLE = 'global_visits';
const DAILY_TABLE = 'daily_visits';
const TOTAL_ID = 'all_visitors';
const BOGOTA_TIME_ZONE = 'America/Bogota';

function dateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BOGOTA_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return values.year + '-' + values.month + '-' + values.day;
}
function dateKeys(days: number): string[] {
  const today = dateKey(new Date());
  const [year, month, day] = today.split('-').map(Number);
  const base = new Date(Date.UTC(year, month - 1, day));
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() - (days - index - 1));
    return date.toISOString().slice(0, 10);
  });
}
async function incrementRecord(table: string, id: string, field: string) {
  await db.tx.add(table, [{ id, [field]: 0 }]);
  const [updated] = await db.tx.update(
    table, [{ id, record: { [field]: increment(1) } }], { patch: true }
  );
  if (!updated) throw new Error('No fue posible actualizar las estadísticas.');
}
export const handler = router({
  'POST /api/visits': [async () => {
    await incrementRecord(TOTALS_TABLE, TOTAL_ID, 'total');
    const todayKey = dateKey(new Date());
    await incrementRecord(DAILY_TABLE, todayKey, 'visits');
    const [total] = await db.get<{ total: number }>(TOTALS_TABLE, [TOTAL_ID], { consistent: true });
    const [today] = await db.get<{ visits: number }>(DAILY_TABLE, [todayKey], { consistent: true });
    if (!total || !today) return json({ error: 'Las estadísticas todavía no están disponibles.' }, 503);
    return json({ visits: total.total, today: today.visits });
  }],
  'GET /api/admin/stats': [
    requireAuth(), requireAdminEmailAllowlist(ADMIN_EMAILS),
    async () => {
      const keys = dateKeys(30);
      const [total, records] = await Promise.all([
        db.get<{ total: number }>(TOTALS_TABLE, [TOTAL_ID], { consistent: true }),
        db.get<{ visits: number }>(DAILY_TABLE, keys, { consistent: true })
      ]);
      const daily = keys.map((date, index) => ({ date, visits: records[index]?.visits ?? 0 }));
      return json({
        total: total[0]?.total ?? 0,
        today: daily[daily.length - 1]?.visits ?? 0,
        last7Days: daily.slice(-7).reduce((sum, item) => sum + item.visits, 0),
        last30Days: daily.reduce((sum, item) => sum + item.visits, 0),
        daily
      });
    }
  ]
});
