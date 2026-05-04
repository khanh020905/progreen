import axios from 'axios';
import { getProvinces, getDistricts, getWards } from '../utils/location';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Location Utility', () => {
  it('should fetch provinces', async () => {
    const data = [{ name: 'Hà Nội', code: 1 }];
    mockedAxios.get.mockResolvedValueOnce({ data });
    
    const result = await getProvinces();
    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://provinces.open-api.vn/api/p/');
  });

  it('should fetch districts for a province', async () => {
    const districts = [{ name: 'Ba Đình', code: 1 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { districts } });
    
    const result = await getDistricts(1);
    expect(result).toEqual(districts);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://provinces.open-api.vn/api/p/1?depth=2');
  });

  it('should fetch wards for a district', async () => {
    const wards = [{ name: 'Trúc Bạch', code: 1 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { wards } });
    
    const result = await getWards(1);
    expect(result).toEqual(wards);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://provinces.open-api.vn/api/d/1?depth=2');
  });
});
