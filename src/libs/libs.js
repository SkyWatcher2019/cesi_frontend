export async function fetchJson(path) {
  const res = await fetch(path);

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error('Request failed');
  }
}
export async function postJson(path, data) {
  const res = await fetch(path, {
    method: 'POST', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error('Request failed');
  }
}

export async function fetchProducts(section) {
  return await fetchJson(section != -1 ? `http://localhost:8000/sections/${ section }/products` : 'http://localhost:8000/products/all');
}

export async function fetchProduct(id) {
  return await fetchJson(`http://localhost:8000/products/${ id }`);
}

export async function createProduct(data){
  return await postJson('http://localhost:8000/products/new', data);
}

export async function fetchSections() {
  return await fetchJson('http://localhost:8000/sections/all');
}

export async function fetchSection(id) {
  return await fetchJson(`http://localhost:8000/sections/${ id }`);
}