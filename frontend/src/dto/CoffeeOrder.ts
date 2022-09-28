export default interface CoffeeOrderDto {
  id?: string;
  fullname: string;
  time: string;
  type: string;
  status?: string;
  isBoss?: boolean;
}
