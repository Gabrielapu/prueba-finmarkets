export default function useThousandSeparator(value) {
  if (value === null || value === undefined) {
    return '0';
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}