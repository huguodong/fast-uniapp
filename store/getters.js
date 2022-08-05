const getters = {
	token: state => state.user.token,
	userId: state => state.user.userId,
	userInfo: state => state.user.userInfo,
	hasLogin:state => state.user.hasLogin,
}

export default getters