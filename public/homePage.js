const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout(response => {
      if(response.success) {
        location.reload();
        }
    });
}





ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});        



const ratesBoard = new RatesBoard();

const gettingStocks = () => ApiConnector.getStocks(response => {
    if(response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
gettingStocks();
setInterval(gettingStocks, 60000);






const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(!response.success, 'Баланс пополнен');
    } else {
      moneyManager.setMessage(!response.success, response.data);
    }
  });
}



moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(!response.success, 'Конвертация выполнена');
    } else {
      moneyManager.setMessage(!response.success, response.data);
    }



  })
}


moneyManager.sendMoneyCallback = data => {

  ApiConnector.transferMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(!response.success, 'Перевод выполнен');
    } else {
      moneyManager.setMessage(!response.success, response.data);
    }
  })


}


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(response.data);
  moneyManager.updateUsersList(response.data);
} );



favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(!response.success, 'Пользователь добавлен');
    } else {
      favoritesWidget.setMessage(!response.success, response.data);
    }
  });
}




favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(!response.success, 'Пользователь удален');
    } else {
      favoritesWidget.setMessage(!response.success, response.data);
    }
  });
}