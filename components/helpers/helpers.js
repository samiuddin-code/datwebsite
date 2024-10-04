/* text portion */
export function text_portion(text,start,end){
    return text.substr(start,end) + '...';
}

/* text portion */
export function plainString(text){
    return text.replace(/<[^>]+>/g, '');
}
/* headers cofif */
export const headers= { 
    headers:{
        'x-api-key': 'KHKJHSKHASD7686ASDHKSHDAKSHDKHASDAASDKH86868ASDVV'
    }
}; 
export const formHeaders= { 
    headers: { 
        'x-api-key': 'KHKJHSKHASD7686ASDHKSHDAKSHDKHASDAASDKH86868ASDVV', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'connect.sid=s%3ADjX_Om1v2q-KERTZgp1Z9HZ3Tz4OMQF1.Y81IQAJ4kd%2FQ2%2FlX3aZPzDGobt8xjN4XnmH7GBmmvc0'
    },
}; 
/* sentence case */
export const sentenceCase = (data) => {
    const result = data.replace(/([A-Z])/g, " $1");
    console.log(result);
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    return finalResult;
}
/* trim spaces  */
export function trimSpaces(str) {return str.replace(/\s/g, '')}
/* slugify js */
export function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    /* str = str.toLowerCase(); */

    str = str.replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}
/* unslugify */
export function unsuglify_string(str) {
    str = str.replace(/-/g,' ')
    return str;
}
/* in viewport function */
export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function convertDate(date){
    if(!date) return "";
    let dt = new Date(date);
    return `${dt.getDate()} ${MONTHS[dt.getMonth()]}, ${dt.getFullYear()}`;
}