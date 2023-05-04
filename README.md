## CRUD với 4 thực thể liên kết với nhau

![banner](https://i.ytimg.com/vi/Z6kt1N3Lx1c/maxresdefault.jpg)

## Lược đồ CSDL về tình nguyện viên:

#Lượt đồ gồm các thực thể sao

ThanhVien ( _MaTV_, HoTen, GioiTinh, NgaySinh, DiaChiEmail, SoDienThoai, isTruongDoan )

HoatDong ( _MaHD_, **MaTV**, MotaHD, NgayGioBD, NgayGioKT, SLToiThieuYC, SLToiDaYC, ThoiHanDK, TrangThai, LyDoHuyHD )

ThamGia ( _MaTG_, **MaTV**, **MaHD**, NgayGioDangKy, DiemTruongDoan, DiemTieuChi1, DiemTieuChi2, DiemTieuChi3, NhanXetKhac )

#Mô tả:											
 - Mỗi thành viên bất kỳ được quyền tổ chức 1 hoặc nhiều hoạt động thiện nguyện cùng lúc	.											
 - Hoạt động thiện nguyện là những hoạt động như mùa hè xanh, hiến máu nhân đạo, góp tiền ủng hộ bệnh nhân ung thư, góp sách cho trẻ em nghèo, phát cháo ở bệnh viện.
 - Mỗi thành viên cũng có quyền tham gia 1 hoặc nhiều hoạt động thiện nguyện do thành viên khác tổ chức cùng lúc.			
 - Thành viên đứng ra tổ chức 1 hoạt động thiện nguyện nào đó được gọi là trưởng đoàn của hoạt động thiện nguyện đó.
 - Khi tạo mới một hoạt động thiện nguyện mới trên hệ thông, trưởng đoàn phải cung cấp những thông tin như: Tên hoạt động, mô tả công việc, ngày giờ bắt đầu, ngày giờ kết thúc, số lượng người tham gia tối thiểu, số lượng người tham gia tối đa, thời hạn đăng ký		
 - Thành viên phải cung cấp các thông tin như: Họ tên, Giới tính, Ngày sinh, Địa chỉ Email, Điện thoại											
 - Mỗi hoạt động sẽ có các trạng thái: **"Đang mời đăng ký"**, **"Đã hết hạn đăng ký"**, **"Trưởng đoàn tự hủy"**,  **"Đã kết thúc"**
 - Một hoạt động sau khi được tạo mới trên hệ thống, nó sẽ có trạng thái là "Đang mời đăng ký"
 - Nếu trưởng đoàn tự ý hủy hoạt động thì phải thông báo rõ nguyên nhân vì sao hủy
 - Sau mỗi hoạt động thiện nguyện, các thành viên tham gia sẽ đánh giá hiệu quả của hoạt động đó và cho điểm đối với khả năng tổ chức của trưởng đoàn. Chỉ được phép đánh giá các hoạt động có trạng thái là "Đã kết thúc". Ngoài cho điểm trưởng đoàn, các tiêu chí sau sẽ được đánh giá:								
+ Tiêu chí 1: Hoạt động này có hữu ích với bạn không?				
+ Tiêu chí 2: Hoạt động này có nên được tổ chức thường xuyên không?		
+ Tiêu chí 3: Hoạt động này có nên được tổ chức rộng rãi cho nhiều người tham gia không?
(Các trường được bôi đậm là trường khóa chính của bảng, dữ liệu của các trường do sinh viên tự định nghĩa)	
+ MaTV trong bảng HOATDONG: Là mã của thành viên làm trưởng đoàn cho một hoạt động		
+ ThoiHanDK: Thời hạn đăng ký								
+ SLToiThieuYC: Số lượng thành viên tối thiểu yêu cầu phải đạt được để tổ chức hoạt động
+ SLToiDaYC: Số lượng thành viên tối đa có thể đăng ký tham gia hoạt động	
+ LyDoHuyHD: Lý do trưởng đoàn hủy hoạt động
+ NhanXetKhac: Là những nhận xét dưới dạng free text, các thành viên có thể góp ý thêm cho hoạt động	
+ DiemTruongDoan: Là điểm đánh giá dành cho trưởng đoàn
SV hãy thiết kế web bằng ngôn ngữ lập trình bất kỳ với các yêu cầu cụ thể như sau:

#Yêu cầu về chức năng:		

- Màn hình 1: Tạo mới một hoạt động thiện nguyện 
    + (Yêu cầu nhập đầy đủ các trường trong bảng HOATDONG, trừ trường LyDoHuyHD)
    
- Màn hình 2: Sửa thông tin một hoạt động thiện nguyện

- Màn hình 3: Liệt kê toàn bộ các hoạt động trong hệ thống 

- Xóa một hoạt động thiện nguyện nào đó từ màn hình số 3 
    + (Lưu ý: Không cho phép xóa các hoạt động ở trạng thái là "Đã kết thúc)
    
- Màn hình 4: Thống kê điểm trung bình (do các thành viên khác đánh giá) của các trưởng đoàn, kết quả hiển thị cần được sắp xếp giảm dần của số điểm trung bình , bao gồm: Mã thành viên (trưởng đoàn), Họ tên thành viên (trưởng đoàn), Điểm đánh giá trung bình	
    (Lưu ý: 
    + Không cần làm chức năng log in và log out cho các màn hình trên	
    + Không cần xử lý để nhập/xuất dữ liệu bằng tiếng Việt có dấu)
    
#Yêu cầu về kỹ thuật: 

- Tạo đầy đủ CSDL và kết nối được đến CSDL bằng code ngôn ngữ backend bất kỳ

- Sử dụng đúng mô hình MVC

- Tuân thủ coding convention (theo tài liệu hướng dẫn đã được cung cấp)	

#Yêu cầu không bắt buộc:									

- Nếu giao diện có tính mỹ thuật cao sẽ được cộng thêm tối đa 1 điểm	


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
