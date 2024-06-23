import request from '@/utils/request';

export function getActions(data: any) {
  return request.post('/checkContent', data);
}
