import React, {Component} from 'react'
import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'

class List extends Component {
  render(){
    return(
      <>
        <div className="sidebar">
          <div className="profile">
            <div className="profile-img">
              <img src={profile} alt="profile picture" />
            </div>
            <div className="profile-name">Ilham Bagas</div>
            <ul className="menu">
              <li className="item">Explore</li>
              <li className="item">History</li>
              <li className="item">Add Book</li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="navbar">
            <ul className="navbar-item">
              <li>All Categories</li>
              <li>All Time</li>
            </ul>
            <div className="search-wrapper">
              <input className="input-search" placeholder="Search Book..." />
            </div>
            <div className="brand">
              <img className="icon" src={logo} alt="logo" />
              <div className="text">Liferary</div>
            </div>
          </div>
          <div className="container">
            <h3>List Book</h3>
            <div className="list-book">
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
            </div>
            <div className="list-book">
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-image">

                </div>
                <div className="card-text">
                  <div className="title">Lorem ipsum</div>
                  <div className="card-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quidem, commodi vel repudiandae voluptate eveniet obcaecati laboriosam nostrum ab labore? Maxime odit inventore culpa sequi, hic totam ut id unde?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default List