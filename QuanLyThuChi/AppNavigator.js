import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ChiTieu from "./src/components/ChiTieu";
import ThuNhap from "./src/components/ThuNhap";
import ChuyenKhoan from "./src/components/ChuyenKhoan"
import DieuChinhSoDu from "./src/components/DieuChinhSoDu"
import ChonHangMuc from "./src/components/ChonHangMuc"
import ChonNguoiTuongTac from "./src/components/ChonNguoiTuongTac";
import ChonTaiKhoan from "./src/components/ChonTaiKhoan";

const AppNavigator = createStackNavigator({
    ChiTieu: { screen: ChiTieu },
    ThuNhap: { screen: ThuNhap },
    ChuyenKhoan: { screen: ChuyenKhoan },
    DieuChinhSoDu: { screen: DieuChinhSoDu },
    ChonHangMuc: { screen: ChonHangMuc },
    ChonNguoiTuongTac: { screen: ChonNguoiTuongTac },
    ChonTaiKhoan : { screen: ChonTaiKhoan }
});

export default AppNavigator;