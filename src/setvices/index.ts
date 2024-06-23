import request from '@/utils/request';

export function getActions(data) {
  return request.post('/checkContent', data);
}
