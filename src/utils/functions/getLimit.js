export default async function getLimit(data) {
  data = parseInt(data._hex, 16);
  return Math.floor((data *= 1.2));
}
