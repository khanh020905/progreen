import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

export const getProvinces = async (): Promise<Province[]> => {
  const res = await axios.get(`${BASE_URL}/p/`);
  return res.data;
};

export const getDistricts = async (provinceCode: number): Promise<District[]> => {
  const res = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
  return res.data.districts;
};

export const getWards = async (districtCode: number): Promise<Ward[]> => {
  const res = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
  return res.data.wards;
};
