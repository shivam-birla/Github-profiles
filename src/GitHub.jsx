import React, { useState } from 'react';
import './Github.css'
const GithubProfile = () => {
    const [username, setUsername] = useState('')
    const [profileData, setprofileData] = useState(null)
    const [repos, setRepos] = useState([])
    const handleSearch = async (event) => {
        if (event.keyCode === 13) {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`)
                console.log(response);
                const data = await response.json()
                if (response.status === 200) { //response.status is 200 process execute and vice-versa
                    setprofileData(data)
                    console.log(data);
                    console.log(data.repos_url); //to see the url of repos 
                    fetchRepos(data.repos_url) //to fetch repositories
                }
                else {
                    setprofileData(null)
                    setRepos([])
                }
            }
            catch (error) {
                console.log(`${error.message}occured`)
            }
        }

    }
    const fetchRepos = async (repoUrl) => {
        try {
            const response = await fetch(repoUrl)
            const data = await response.json()
            if (response.status === 200) {
                setRepos(data)
                console.log(data)
                console.log(data.fullname)
            }
            else {
                setRepos([])
            }
        } catch (error) {
            console.log(`error in fethcing api repos ${error.message}`)
        }

    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input type="text" placeholder='Search a Github User' width={'200px'} value={username} onKeyDown={handleSearch} onChange={(e) => { setUsername(e.target.value) }} />
            {profileData && (
                <div className='displayData'>
                    <img src={profileData.avatar_url} width={'120px'} height={'50px'} alt="profile" />
                    <div>
                        {profileData.name ? <h2>{profileData.name}</h2> : <h2>Null</h2>}
                        {profileData.bio ? <p>{profileData.bio}</p> : <p>Null</p>}
                        <div className='span'>
                            <span>{profileData.followers} Followers</span>
                            <span>{profileData.following} Following</span>
                            <span>{profileData.public_repos} Repos</span>
                        </div>
                        <ul>
                            {repos.slice(0, 5).map((repo) => (
                                <li key={repo.id}> <a target='blank' href={`https://github.com/${repo.full_name}`}>{repo.name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>)}
            <div>



            </div>
        </div>
    )
}
export default GithubProfile