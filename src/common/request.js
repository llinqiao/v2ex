const Request = url => {
  return fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      // 统一处理
      alert("request failed");
      return new Error(response.status);
    }
  });
};

export default Request;


