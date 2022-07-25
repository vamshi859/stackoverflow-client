import React,{ useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBirthdayCake,faPen, faMapMarker, faSpinner} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import axios from "axios";
import { useEffect } from "react";
import { fetchAllUsers } from "../../actions/users";

const UserProfile = () => {
    const {id} = useParams();
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id===id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch,setSwitch] = useState(false);
    const [ip,setIp] = useState("");
    const [cityName,setCityName] = useState("");
    const dispatch = useDispatch();
    console.log(currentProfile);
    console.log(currentUser);
    // const cityApi = axios.get(`http://api.ipstack.com/${ip}?access_key=4cdfafb3d9188cf5a100bcc8ca63b9c9`)
    const fetchLocation = () => {
        const cityApi = axios.get(`https://ipapi.co/${ip}/json/`)
        cityApi.then((res,err) => {
            if(res.data){
                setCityName(res.data.city)
            }
        })
    }
    useEffect(() => {
        fetchLocation();
        dispatch(fetchAllUsers());
        setIp(currentProfile?.ip)
    },[])
    console.log({ip,cityName});
    return (
        <div className='home-container-1'>
            <LeftSidebar />         
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {
                                    currentProfile?.name.charAt(0).toUpperCase()
                                }
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <div className="joinDob">                                    
                                    <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                                    <p style={{marginLeft: "25px"}}><FontAwesomeIcon icon={faBirthdayCake} /> Age:  {moment().diff(moment(currentProfile?.dob).format('YYYY/MM/DD'), 'years',false)} years</p>
                                </div>
                                <p style={{marginTop:"10px"}}><FontAwesomeIcon icon={faMapMarker} /> {
                                    cityName ? cityName :
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                }</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type="button" onClick={() => setSwitch(true)} className="edit-profile-btn">
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>   
        </div>
    )
}

export default UserProfile;