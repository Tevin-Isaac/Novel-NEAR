import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import {accountBalance, login, logout as destroy} from "./utils/near";
import {Container, Nav} from "react-bootstrap";
import Wallet from "./components/Wallet";
import {Notification} from "./components/utils/Notifications";
import Books from "./components/library/Books";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/coverImg.jpg";
import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';














function App() {
    const account = window.walletConnection.account();
    const [balance, setBalance] = useState("0");
    const getBalance = useCallback(async () => {
        if (account.accountId) {
            setBalance(await accountBalance());
        }
    }, [account.accountId]);

    useEffect(() => {
        getBalance().then();
    }, [getBalance]);
    return (
        <>
 
 

  
            <Notification/>
            {account.accountId ? (
                <Container fluid="md">
                    <Nav className="justify-content-end pt-3 pb-5">
                        <Nav.Item>
                            <Wallet
                                address={account.accountId}
                                amount={balance}
                                symbol="NEAR"
                                destroy={destroy}
                            />
                        </Nav.Item>
                    </Nav>
                    <Header />
                    
                    <main>
                    
                        <Books/>
                        <section id="about">
      <div class="about-wrapper container">
        <div class="about-text">
          <p class="small">About Us</p>
          <h2>We've been collecting best Novels for the last 10 years</h2>
          <p>
          In 2009, a group of researchers measured the effects of yoga, humor, and reading on the stress levels of students in demanding health science programs in the United States.

The study found that 30 minutes of reading lowered blood pressure, heart rate, and feelings of psychological distress just as effectively as yoga and humor did.

The authors concluded, “Since time constraints are one of the most frequently cited reasons for high stress levels reported by health science students, 30 minutes of one of these techniques can be easily incorporated into their schedule without diverting a large amount of time from their studies.”
          </p>
        </div>
        <div class="about-img">
          <img src="https://c4.wallpaperflare.com/wallpaper/543/473/262/margot-robbie-harley-quinn-suicide-squad-movies-wallpaper-preview.jpg" alt="food" />
        </div>
      </div>
    </section>
    <section id="testimonials">
      <h2 class="testimonial-title">What Our Reviewers Say</h2>
      <div class="testimonial-container container">
        <div class="testimonial-box">
          <div class="customer-detail">
            <div class="customer-photo">
              <img src="https://c1.wallpaperflare.com/preview/660/567/691/people-book-books-coast.jpg" alt="" />
              <p class="customer-name">Optimus  Prime</p>
            </div>
          </div>
          <div class="star-rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
          </div>
          <p class="testimonial-text">
            I love Novels.Novels will exist forever.
          </p>
         
        </div>
        <div class="testimonial-box">
          <div class="customer-detail">
            <div class="customer-photo">
              <img
                src="https://i.postimg.cc/sxd2xCD2/female-photo1.jpg"
                alt=""
              />
              <p class="customer-name">Amelia Watson</p>
            </div>
          </div>
          <div class="star-rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
          </div>
          <p class="testimonial-text">
           For sometime i wanted to always appreciate all time great novels.This is the place of appreciation.
          </p>
         
        </div>
        <div class="testimonial-box">
          <div class="customer-detail">
            <div class="customer-photo">
              <img src="https://c4.wallpaperflare.com/wallpaper/327/405/137/women-blonde-sitting-grass-wallpaper-preview.jpg" alt="" />
              <p class="customer-name">Susan Audrey</p>
            </div>
          </div>
          <div class="star-rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
          </div>
          <p class="testimonial-text">
            Reading is something that will always help you and build your way of thinking and viewing life.
          </p>
         
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="contact-container container">
        <div class="contact-img">
          <img src="https://c4.wallpaperflare.com/wallpaper/73/1001/299/fantasy-art-artwork-digital-art-science-fiction-wallpaper-preview.jpg" alt="" />
        </div>

        <div class="form-container">
          <h2>Contact Us</h2>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="E-Mail" />
          <textarea
            cols="30"
            rows="6"
            placeholder="Type Your Message"
          ></textarea>
          <a href="#" class="btn btn-primary">Submit</a>
        </div>
      </div>
    </section>
                    </main>
                </Container>
            ) : (
                <Cover login={login} coverImg={coverImg}/>
            )}

            <Footer/>
            
        </>
    );
}

export default App;