import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.01'], 
  },
};

export default function () {
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  
  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'h2',
  });
  sleep(1);
}