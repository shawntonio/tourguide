import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as randomString } from 'uuid';


import { clearUser } from '../../store'

class Profile extends Component {
	constructor() {
		super()
		this.imgInput = React.createRef()
		this.state = {
			userInfo: {},
			uploadImg: 'https://britz.mcmaster.ca/images/nouserimage.gif/image'
		}
	}

	componentDidMount() {
		this.props.previousPageReturn()
		this.getUserInfo()
	}

	logout = () => {
		Axios.get('/auth/logout').then(() => {
			this.props.clearUser()
		})
	}

	getUserInfo = () => {
		Axios.get(`/user?id=${this.props.login_id}`).then(res => {
			this.setState({ userInfo: res.data })
			console.log(res.data)
		})
	}

	getSig = (file) => {
		const filename = `${randomString()}-${file.name.replace(/\s/g, '-')}`

		Axios.get(`api/sig`, {
			params: {
				filename,
				filetype: file.type
			}
		}).then(res => {
			const { signedRequest, url } = res.data
			this.setState({uploadImg: url})
			this.uploadFile(file, signedRequest, url)
		})
	}

	uploadFile = (file, signedRequest, url) => {
		const options = {
			headers: {
				'Content-Type': file.type,
			},
		}

		Axios.put(signedRequest, file, options).then(() => {
			Axios.put(`/user`, {...this.state.userInfo, profile_pic: url})
		})
	}

	clickImgInput = () => {
		this.imgInput.current.click()
	}
	render() {
		const { firstname, lastname, email, profile_pic } = this.state.userInfo
		return (
			<div className='profile'>
				{firstname && <div>

					<div className='profile'>
						{profile_pic ? <img className='profile-pic' src={profile_pic} alt="profile_pic" />
							: <div>
								<div className='profile-pic'>
									<img src={this.state.uploadImg} alt='none' />
								</div>
								<input ref={this.imgInput} accept="image/*" style={{display: 'none'}} type="file" onChange={() => this.getSig(this.imgInput.current.files[0])} />
								<p onClick={this.clickImgInput}>Add Picture</p>
							</div>}
					</div>

					<h4>{`${firstname} ${lastname}`}</h4>
					<p>{this.props.username}</p>
					<p>{email}</p>
				</div>}

				<button onClick={this.logout}>Logout</button>
				<button onClick={() => this.props.history.push('/workbench')}>Tour Work Bench</button>
			</div>
		)
	}
}

const mapDispatchToProps = {
	clearUser
}

const mapStateToProps = state => {
	return { username: state.username, login_id: state.login_id }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))