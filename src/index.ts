import "dotenv/config";
import App from "./app";
import ThanhVienRoute from "./routes/api/thanhvien.route"
import HoatDongRoute from "./routes/api/hoatdong.route";
import ThamGiaRoute from "./routes/api/thamgia.route";

const app = new App([
    new ThanhVienRoute(),
    new HoatDongRoute(),
    new ThamGiaRoute()
], parseInt(process.env.PORT || "5000"));

app.listen();