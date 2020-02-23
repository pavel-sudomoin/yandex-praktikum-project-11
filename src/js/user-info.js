export class UserInfo {
  constructor(container) {
    this.container = container;
  }
  setUserInfo( data ) {
    this.data = data;
    this.updateUserInfo();
  }
  updateUserInfo() {
    this.container.querySelector('.user-info__name').textContent = this.data.name;
    this.container.querySelector('.user-info__job').textContent = this.data.about;
    this.container.querySelector('.user-info__photo').style.backgroundImage = `url('${this.data.avatar}')`;
  }
}