const url = "htpp://someurl.com";
const fetch = url => new Promise(resolve => resolve({ text() {return "html"} }));

async function fetchUsers(url) {
  let response = await fetch(url),
      html = response.text();
  console.log(html);
  return html;
}

fetchUsers(url).then(console.log);