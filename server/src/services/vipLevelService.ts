import connection from "../database/mysql";
import { error_server } from "../lib/define";

const getVipLevels = async (whereClause = "") => {
  const sql_select = `
    Select * from vip_levels
    ${whereClause}
    order by level asc
  `;

  const [rows]: any = await connection.promise().query(sql_select);

  return {
    status: "success",
    message: "Get vip levels successfully!",
    data: {
      items: rows,
    },
  };
};

export const handleGetAllVipLevel = async () => {
  try {
    return await getVipLevels("where is_admin_only = 0");
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetAllVipLevelForAdmin = async () => {
  try {
    return await getVipLevels();
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
