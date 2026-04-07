# Balas Purchase Requisiton Portal

Ứng dụng quản lý yêu cầu ngân sách trên Power Pages và cho phép truy cập trên các thiết bị Mobile, tích hợp Dynamics 365 Business Central qua OData API.


# Các chức năng Power Pages Purchase Requisition:

- Quản lý danh sách Purchase Requisitions
- Nhập thông tin Purchase Requisition
- Quản lý thông tin Department, Project ( Dimensions Values)
- Quản lý thông tin user
- Tra cứu thông tin ngân sách (bằng cách gọi API)
- Quản lý ma trận phê duyệt (Approval Matrix) 


# Kiến trúc:

Busines Central <---API---> Dataverse <---API-->Power Pages<--UI & JS -->User

- LƯU Ý: Phía bên Business Central, tất cả các API liên quan đã được hoàn tất. Ngoài ra việc Sync các dữ liệu giữa BC và Dataverse đã được hoàn thành.

==> Dự án này sẽ chỉ bao gồm việc nâng cấp Power Pages bằng cách sử dụng React
==> Tập trung nâng cấp giao diện, trải nghiệm người dùng 


# Upload your SPA to Power Pages
pac pages upload-code-site --rootpath <<path where site is located>> --compiledPath <<path where code is compiled ex: /dist>> --siteName <<sitename>>

 
