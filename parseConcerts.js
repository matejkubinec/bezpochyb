const body = document.querySelector('body');
const elements = Array.from(body.children).slice(3);

function parseTime(datetime) {
  const [time, period] = datetime.split(',')[2].trim().split(' ');
  const [hours, minutes] = time.split(':');
  const str = `${hours}:${minutes || 0}${period.replace(/\./g, '')}`;
  const dt = luxon.DateTime.fromString(str, 'h:ma', {
    zone: 'Europe/Bratislava',
  }).toISOTime();
  return dt;
}

function parseDate(datetime) {
  const date = datetime.split(',').slice(0, 2).join('').replace('.', '');
  const [monthStr, dayStr, yearStr] = date.trim().split(' ');
  const month = luxon.DateTime.fromString(monthStr.slice(0, 3), 'LLL').month;
  const day = Number.parseInt(dayStr);
  const year = Number.parseInt(yearStr);
  const dt = luxon.DateTime.fromObject({ month, day, year });
  return dt.toISODate();
}

function parseDateTime(datetime) {
  const date = parseDate(datetime);
  const time = parseTime(datetime);
  return luxon.DateTime.fromISO(`${date}T${time}`).toISO();
}

function parseConcert(concert) {
  const [title, city, datetime, bands] = concert.map((c) => c.textContent);
  return {
    title,
    city,
    venue: '',
    location: '',
    datetime: parseDateTime(datetime),
    bands: bands.split(',').map((b) => b.trim()),
  };
}

function parseElements(elements) {
  const concerts = new Array();
  let concert = [];

  for (const element of elements) {
    if (element.tagName === 'BR') {
      concerts.push(concert);
      concert = [];
    } else {
      concert.push(element);
    }
  }

  return concerts.map(parseConcert);
}

const concerts = parseElements(elements);

console.log(concerts);
