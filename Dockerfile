# 1. Dùng Node.js base image
FROM node:20-alpine

# 2. Đặt thư mục làm việc
WORKDIR /app

# 3. Sao chép các file cấu hình yarn
COPY package.json yarn.lock ./

# 4. Cài đặt dependencies với Yarn
RUN yarn install

# 5. Sao chép toàn bộ source vào container
COPY . .

# 6. Build project cho production
RUN yarn build


# 10. Expose cổng 80
EXPOSE 3000

# 11. Chạy nginx
CMD ["npm", "start"]
