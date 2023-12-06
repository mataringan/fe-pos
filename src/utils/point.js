import { POINT_USER } from "@/apis";
import axios from "axios";

export const getPoint = async ({ token }) => {
    try {
        const response = await axios.get(POINT_USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
