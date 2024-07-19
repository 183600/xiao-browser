var xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/api/data", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    // 处理响应数据
  }
};
xhr.send();