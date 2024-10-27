# Các Khái Niệm Cơ Bản trong Mongoose

## 1. Document

Trong Mongoose, một Document đại diện cho một bản ghi duy nhất trong cơ sở dữ liệu MongoDB. Nó tương đương với một hàng trong cơ sở dữ liệu quan hệ.

- Document là một thể hiện của Model.
- Nó chứa dữ liệu thực tế và các phương thức để tương tác với dữ liệu đó.
- Mỗi Document có một ID duy nhất (\_id) được MongoDB tự động tạo.

Ví dụ:
typescript
interface IUserDocument extends Document {
name: string;
email: string;
age: number;
}

## 2. Schema

Schema định nghĩa cấu trúc của Document trong một collection MongoDB.

- Nó xác định các trường, kiểu dữ liệu, và các ràng buộc (như required, unique).
- Schema cũng có thể định nghĩa các phương thức, indexes, và middleware.
- Nó là bản thiết kế cho Document.

Ví dụ:
typescript
const UserSchema = new Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
age: { type: Number }
});

## 3. Omit

`Omit` là một utility type của TypeScript, không phải của Mongoose. Nó được sử dụng để tạo một type mới bằng cách loại bỏ một số thuộc tính từ một type hiện có.

- Hữu ích khi bạn muốn tạo một phiên bản "nhẹ" của một interface hoặc type.
- Thường được sử dụng khi làm việc với các interface phức tạp.

Ví dụ:
typescript
interface IUser {
id: string;
name: string;
email: string;
password: string;
}
type IUserWithoutPassword = Omit<IUser, 'password'>;
// IUserWithoutPassword sẽ có các trường: id, name, email

## 4. Model

Model trong Mongoose là một constructor được biên dịch từ Schema.

- Nó đại diện cho một collection trong cơ sở dữ liệu.
- Model cung cấp một interface để tương tác với cơ sở dữ liệu cho một collection cụ thể.
- Nó được sử dụng để tạo, đọc, cập nhật và xóa documents.

Ví dụ:
typescript
const User: Model<IUserDocument> = model<IUserDocument>('User', UserSchema);
// Sử dụng Model để tạo một document mới
const newUser = new User({ name: 'John Doe', email: 'john@example.com' });
await newUser.save();
// Sử dụng Model để truy vấn documents
const users = await User.find({ age: { $gte: 18 } });

Tóm lại:

- Document: Một bản ghi duy nhất trong cơ sở dữ liệu.
- Schema: Định nghĩa cấu trúc của Document.
- Omit: Utility type của TypeScript để loại bỏ thuộc tính từ một type.
- Model: Constructor để tương tác với collection trong cơ sở dữ liệu.

Hiểu rõ các khái niệm này sẽ giúp bạn làm việc hiệu quả hơn với Mongoose và MongoDB trong các dự án Node.js của mình.
