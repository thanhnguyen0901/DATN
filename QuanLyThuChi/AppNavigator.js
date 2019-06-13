import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ChiTieu from "./src/components/ChiTieu";
import ThuNhap from "./src/components/ThuNhap";
import ChuyenKhoan from "./src/components/ChuyenKhoan"
import DieuChinhSoDu from "./src/components/DieuChinhSoDu"
import ChonHangMuc from "./src/components/ChonHangMuc"

const AppNavigator = createStackNavigator({
    ChiTieu: {
        screen: ChiTieu
    },
    ThuNhap: {
        screen: ThuNhap
    },
    ChuyenKhoan: {
        screen: ChuyenKhoan
    },
    DieuChinhSoDu: {
        screen: DieuChinhSoDu
    },
    ChonHangMuc: {
        screen: ChonHangMuc
    }
});

export default AppNavigator;