import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ChiTieu from "./src/components/ChiTieu";
import ThuNhap from "./src/components/ThuNhap";
import ChuyenKhoan from "./src/components/ChuyenKhoan";
import DieuChinhSoDu from "./src/components/DieuChinhSoDu";
import ChonHangMucChi from "./src/components/ChonHangMucChi";
import ChonHangMucThu from "./src/components/ChonHangMucThu";
import ChiChoAi from "./src/components/ChiChoAi";
import ThuTuAi from "./src/components/ThuTuAi";
import ChonTaiKhoan from "./src/components/ChonTaiKhoan";
import HanMucChi from "./src/components/HanMucChi";
import Khac from "./src/components/Khac";
import TaiKhoan from "./src/components/TaiKhoan";
import ThemMoi from "./src/components/ThemMoi";
import TongQuan from "./src/components/TongQuan";

const AppNavigator = createStackNavigator({
    ChiTieu: { screen: ChiTieu },
    ThuNhap: { screen: ThuNhap },
    ChuyenKhoan: { screen: ChuyenKhoan },
    DieuChinhSoDu: { screen: DieuChinhSoDu },
    ChonHangMucChi: { screen: ChonHangMucChi },
    ChonHangMucThu: { screen: ChonHangMucThu },
    ChiChoAi: { screen: ChiChoAi },
    ThuTuAi: { screen: ThuTuAi },
    ChonTaiKhoan : { screen: ChonTaiKhoan },
    HanMucChi: { screen: HanMucChi },
    Khac: { screen: Khac },
    TaiKhoan: { screen: TaiKhoan },
    ThemMoi: { screen: ThemMoi },
    TongQuan: { screen: TongQuan }
},
{
    headerMode: 'none'
});

export default AppNavigator;