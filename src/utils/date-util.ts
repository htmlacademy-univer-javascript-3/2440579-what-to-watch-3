export default function getRussianFormatDate(isoDate: string) : string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(isoDate));
}
