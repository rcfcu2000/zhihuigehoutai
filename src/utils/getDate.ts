export function getMonthFinalDay(index: any) {
    let data: any = new Date();
    let year: any = data.getFullYear();
    let month: any = data.getMonth() + 1;
    let day: any = data.getDate();
    let beginDate: any = '',
        endDate: any = '';
    switch (index) {
        //今天
        case '0':
            beginDate = getDate(0)
            endDate = getDate(0) + " 23:59:59";
            break;
        //昨天
        case '1':
            beginDate = getDate(-1)
            endDate = getDate(-1) + " 23:59:59";
            break;
        //明天
        case '2':
            beginDate = getDate(1)
            endDate = getDate(1) + " 23:59:59";
            break;
        //本周 
        case '3':
            beginDate = getMonday('s', 0)
            endDate = getMonday('e', 0);
            break;
        //上周
        case '4':
            beginDate = getMonday('s', -1)
            endDate = getMonday('e', -1);
            break;
        //下周
        case '5':
            beginDate = getMonday('s', 1)
            endDate = getMonday('e', 1);
            break;
        //本月
        case '6':
            beginDate = getMonth('s', 0)
            endDate = getMonth('e', 0);
            break;
        //上月
        case '7':
            beginDate = getMonth('s', -1)
            endDate = getMonth('e', -1);
            break;
        //下月
        case '8':
            beginDate = getMonth('s', 1)
            endDate = getMonth('e', 1);
            break;
        //本年
        case '9':
            beginDate = getYear('s', 0)
            endDate = year + '-' + month + '-' + day;
            break;
        //去年
        case '10':
            beginDate = getYear('s', -1)
            endDate = getYear('e', -1);
            break;
        //明年
        case '11':
            beginDate = getYear('s', 1)
            endDate = getYear('e', 1);
            break;
        //全年
        case '12':
            beginDate = getYear('s', 0)
            endDate = getYear('e', 0);
            break;
        default:
            beginDate = "1970-01-01 00:00:01"
            endDate = "3000-12-31 23:59:59";
            break;
    }
    return {
        beginDate,
        endDate
    }
}

//日期
export function getDate(dates: any) {
    let date: any = new Date();
    let n: any = dates || 0;
    date.setDate(date.getDate() + n);
    let y: any = date.getFullYear();
    let m: any = date.getMonth() + 1;
    let d: any = date.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    let day = y + "-" + m + "-" + d;
    return day;
}

//周
export function getMonday(type: any, dates: any) {
    let now = new Date();
    let nowTime = now.getTime();
    let day = now.getDay();
    let longTime = 24 * 60 * 60 * 1000;
    let n = longTime * 7 * (dates || 0);
    let date: any = ''
    if (type == "s") {
        date = nowTime - (day - 1) * longTime + n;
    };
    if (type == "e") {
        date = nowTime + (7 - day) * longTime + n;
    };
    date = new Date(date);
    let y: any = date.getFullYear();
    let m: any = date.getMonth() + 1;
    let d: any = date.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    let days = y + "-" + m + "-" + d;
    return days;
}

//月份
export function getMonth(type: any, months: any) {
    let date: any = new Date();
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    if (Math.abs(months) > 12) {
        months = months % 12;
    };
    if (months != 0) {
        if (month + months > 12) {
            year++;
            month = (month + months) % 12;
        } else if (month + months < 1) {
            year--;
            month = 12 + month + months;
        } else {
            month = month + months;
        };
    };
    month = month < 10 ? "0" + month : month;
    let firstday = year + "-" + month + "-" + "01";
    let lastday = "";
    if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
        lastday = year + "-" + month + "-" + 31;
    } else if (month == "02") {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
            lastday = year + "-" + month + "-" + 29;
        } else {
            lastday = year + "-" + month + "-" + 28;
        };
    } else {
        lastday = year + "-" + month + "-" + 30;
    };
    let day = "";
    if (type == "s") {
        day = firstday;
    } else {
        day = lastday;
    };
    return day;
}

//年
export function getYear(type: any, dates: any) {
    let date: any = new Date();
    let n: any = dates || 0;
    let year: any = date.getFullYear() + Number(n);
    let day = ''
    if (type == "s") {
        day = year + "-01-01";
    };
    if (type == "e") {
        day = year + "-12-31";
    };
    if (!type) {
        day = year + "-01-01/" + year + "-12-31";
    };
    return day;
}