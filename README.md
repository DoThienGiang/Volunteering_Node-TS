## CRUD với 4 thực thể liên kết với nhau

![banner](https://i.ytimg.com/vi/Z6kt1N3Lx1c/maxresdefault.jpg)

## Cho lược đồ CSDL quản lý điểm sinh viên, gồm các lược đồ quan hệ sau:

ThanhVien ( MaTV, HoTen, GioiTinh, NgaySinh, DiaChiEmail, SoDienThoai, isTruongDoan )

HoatDong ( MaHD, **MaTV**, MotaHD, NgayGioBD, NgayGioKT, SLToiThieuYC, SLToiDaYC, ThoiHanDK, TrangThai, LyDoHuyHD )

ThamGia ( MaTG, **MaTV**, **MaHD**, NgayGioDangKy, DiemTruongDoan, DiemTieuChi1, DiemTieuChi2, DiemTieuChi3, NhanXetKhac )

## Preparing For Deployment

Environment configurations:

```env
PORT = 5000
MONGO_URL = mongodb://0.0.0.0:27017/Volunteering_NodeJS-TS
```

Run the server in developer mode:

    $ npm run dev

Create a build directory in the client directory,

    $ npm run build

Run the server in production mode(simulator):

    $ npm start
