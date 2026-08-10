"use client";

import { CoffeeOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";

const Donate = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Divider orientation="center">
        Ủng hộ tôi ly cà phê
        <CoffeeOutlined className="ml-2" />
      </Divider>
      <p className="my-4 text-base text-center">
        Nếu bạn mê truyện trên{" "}
        <span className="text-[#13c2c2] font-semibold">NETMANGA</span>, hãy
        tài trợ cho tôi một ly cà phê ☕ để tôi có đủ năng lượng cày code xuyên
        đêm, fix bug thần tốc và tiếp tục mang đến những bộ truyện siêu hay cho
        các bro nhé! 🚀❤️
      </p>
      <Image
        className="rounded-lg border border-gray-200"
        width={300}
        height={380}
        alt="QR-CODE"
        src="/images/donate.jpg"
      />
    </div>
  );
};

export default Donate;
