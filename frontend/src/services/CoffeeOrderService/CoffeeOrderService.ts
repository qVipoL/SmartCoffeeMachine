import CoffeeOrderDto from "src/dto/CoffeeOrder";
import API from "src/services/common/API";

export default class CoffeeOrderService {
  static async getActiveOrders() {
    return (await API.get<CoffeeOrderDto[]>("/coffee/in-preparation")).data;
  }

  static async getLast30Days() {
    return (await API.get<CoffeeOrderDto[]>("/coffee?lastMonth=true")).data;
  }

  static async createCoffeeOrder(body: any) {
    return (await API.post<CoffeeOrderDto>("/coffee", body)).data;
  }
}
