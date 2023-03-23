"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService_1 = __importDefault(require("../service/OrderService"));
const PostService_1 = __importDefault(require("../service/PostService"));
class OrderController {
    constructor() {
        this.getAllOrdersInSeller = async (request, response) => {
            try {
                let idPost = request.params.id;
                let orders = await this.oderService.getAllOrdersInSellerService(idPost);
                response.status(200).json(orders);
            }
            catch (error) {
                response.status(500).json(error.message);
            }
        };
        this.getAllOrdersInUser = async (request, response) => {
            try {
                let idPost = request.params.id;
                let orders = await this.oderService.getAllOrdersInUserService(idPost);
                response.status(200).json(orders);
            }
            catch (error) {
                response.status(500).json(error.message);
            }
        };
        this.addOrder = async (request, response) => {
            try {
                let order = request.body;
                let x = new Date(order.endTime);
                let y = new Date(order.startTime);
                order.dateOfOrder = new Date();
                let time = await this.oderService.subtractionDate(order.startTime, order.endTime);
                let checkTime = await this.oderService.subtractionDate(y, order.dateOfOrder);
                let checkOrder = await this.oderService.getOrderInDay(order.idPost, order.startTime, order.endTime);
                let price = await this.postService.findPrice(order.idPost);
                if (time >= 0) {
                    if (checkOrder == false) {
                        response.status(200).json(" Bạn chưa thể thuê dịch vụ");
                    }
                    else {
                        if (y > order.dateOfOrder) {
                            order.total = (time * 24 + (x.getHours() - y.getHours())) * price;
                            order = await this.oderService.saveOrder(order);
                            response.status(200).json(order);
                        }
                        else if (y == order.dateOfOrder) {
                            if (y.getHours() > (order.dateOfOrder).getHours()) {
                                order.total = (x.getHours() - y.getHours()) * price;
                                order = await this.oderService.saveOrder(order);
                                response.status(200).json(order);
                            }
                            else {
                                return "hãy chọn lại thời gian bắt đầu thuê";
                            }
                        }
                        else {
                            return "hãy chọn lại ngày bắt đầu thuê";
                        }
                    }
                }
                else {
                    response.json('Hãy chọn lại ngày thuê dịch vụ');
                }
            }
            catch (error) {
                response.status(500).json(error.message);
            }
        };
        this.changeStatusOrder = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.oderService.changeStatusOrderService(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.oderService = OrderService_1.default;
        this.postService = PostService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map