class AdminDashBoard{
    static update_TotalSales_GrossProfit_DATA = function(priceProduct,quantityProduct){
        const arrAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
        const admin = {...arrAdmin[0]};
        admin.totalSales = Number(admin.totalSales) + (priceProduct * quantityProduct);
        const grossProfit = 0.12; // <= 12% price of one product
        admin.grossProfit = Number(admin.grossProfit) + (priceProduct * quantityProduct) * grossProfit;
        localStorage.removeItem('dataBaseAdmin')
        localStorage.setItem('dataBaseAdmin',JSON.stringify([admin]));
    }
    static displayDataDashBoard = function(){
        const arrAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
        const admin = {...arrAdmin[0]};
        const totalSalesElement = document.querySelector('body #container #main > section.leftSection .Dashboard .boxs .box .content .contentLeft h2.totalSales');
        totalSalesElement.textContent = `$${Number(admin.totalSales).toFixed(2)}`;
        const grossProfitElement = document.querySelector('body #container #main > section.leftSection .Dashboard .boxs .box .content .contentLeft h2.grossProfit');
        grossProfitElement.textContent = `$${Number(admin.grossProfit).toFixed(2)}`;    
    }
    static DisplayRecentOrders = function(){
        const recentOrdersElements = document.querySelector('body #container #main > section.leftSection .Dashboard .recentOrders nav .listItems');
        recentOrdersElements.innerHTML = ``;
        let dataBaseRecentOrders = JSON.parse(localStorage.getItem('dataBaseRecentOrders'));
        dataBaseRecentOrders = dataBaseRecentOrders.reverse();
        for(let i = 0;i<4;i++){
            const li = document.createElement('li');
            li.className = 'item';
            let color = '';
            switch(dataBaseRecentOrders[i].status.toLowerCase()){
                case 'declined':
                    color = '#d9040f';
                    break;
                case 'delivered':
                    color = '#007d00';
                    break;
            }
            li.innerHTML = `
            <span class="costumerName">${dataBaseRecentOrders[i].fullName}</span>
            <span class="productTitle">${dataBaseRecentOrders[i].titleProduct}</span>
            <span class="idProduct">${dataBaseRecentOrders[i].idProduct}</span>
            <span class="status" style='color:${color};'>${dataBaseRecentOrders[i].status}</span>`;
            recentOrdersElements.insertBefore(li,recentOrdersElements.children[0]);
        }
    }
    static RecentUpdate = function(){
        const arrAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
        const admin = {...arrAdmin[0]};
        const RrecentUpdateElement = document.querySelector('body #container #main > section.rightSection .recentUpdate');        
        RrecentUpdateElement.innerHTML = ``;

        admin.notifications = admin.notifications.reverse();
        for(let i = 0;i<3;i++){
            const div = document.createElement('div');
            div.className = `adminNotification`;
            div.innerHTML = `
                <div class="img">
                    <a><i class="bx bx-camera"></i></a>
                    <img src="${admin.notifications[i].imgUser == undefined ? '' : admin.notifications[i].imgUser}">
                </div>
                <div class="content">
                  <b>${admin.notifications[i].sender}</b>
                  <p>has buy the product ${admin.notifications[i].titleProduct}.</p>
                  <span class="date">${admin.notifications[i].hour}:${admin.notifications[i].minutes}</span>
                </div>`;
                RrecentUpdateElement.insertBefore(div,RrecentUpdateElement.children[0]);
        }
    }
}

export {AdminDashBoard};

window.addEventListener('DOMContentLoaded',function(){
    AdminDashBoard.displayDataDashBoard();
    AdminDashBoard.DisplayRecentOrders();
    AdminDashBoard.RecentUpdate();
});