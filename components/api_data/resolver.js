import axios from 'axios';
export default async function fetchData(arr=[]) {
    let dataArr = []
    arr.map((item => dataArr.push(
        axios(item).then(res => res.data),
    )))
    const fetchIndex = [
        ...dataArr,
        axios(`/blogs`).then(res => res.data),
        axios(`/clients`).then(res => res.data),
        axios(`/siteSetting`).then(res => res.data),
    ]
    const response = await Promise.all(fetchIndex);
    return response
}