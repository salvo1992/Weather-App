import { useMemo } from 'react';
export default function useDayPhase(data){
  return useMemo(() => {
    if(!data) return 'day';
    const now = data.dt;
    return now > data.sys.sunrise && now < data.sys.sunset ? 'day':'night';
  },[data]);
}
