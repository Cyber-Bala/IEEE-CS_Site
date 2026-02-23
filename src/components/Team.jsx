import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './Team.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images
import pkumar from '../assets/team/p kumar.jpg';
import vinod from '../assets/team/vinod.jpg';
import duraimurugan from '../assets/team/duraimurugan.jpg';
import anandhajodhii from '../assets/team/anandhajodhii.jpg';
import gokulasarathy from '../assets/team/gokulasarathy.jpg';
import himesh from '../assets/team/himesh.jpg';
import gokulanand from '../assets/team/gokulanand.jpg';
import srivarshini from '../assets/team/srivarshini.jpg';
import janani from '../assets/team/janani.jpg';
import kabilesh from '../assets/team/kabilesh.jpg';
import dharma from '../assets/team/dharma.jpg';
import vishwa from '../assets/team/vishwa.jpeg';
import kamalesh from '../assets/team/Kamalesh S P.JPG';
import jamisaiakshaya from '../assets/team/jamisaiakshaya.jpg';
import ishwari from '../assets/team/Ishwari Rajmohan.jpg';
import jayadharsini from '../assets/team/Jayadharsini.jpg';
import ramalingam from '../assets/team/ramalingam.jpeg';
import jayasudhan from '../assets/team/jayasudhan.jpg';
import renith from '../assets/team/RENITH.jpg';
import saiprapanch from '../assets/team/saiprapanch.jpg';
import venkatb from '../assets/team/VENKATBADHRINARAYANAN PV.png';
import balambika from '../assets/team/balambika.jpg';
import neha from '../assets/team/neha.jpg';
import vrithi from '../assets/team/vrithi sree.jpg';
import merlyn from '../assets/team/merlyn.jpg';
import mukesh from '../assets/team/mukesh.jpg';
import nishani from '../assets/team/nishani.jpeg';
import athira from '../assets/team/athira.jpg';
import keerthana from '../assets/team/keerthana.jpg';
import mriduladevi from '../assets/team/mriduladevi.jpg';
import pirai from '../assets/team/pirai.jpg';
import reshma from '../assets/team/reshma.jpg';
import shivani from '../assets/team/shivani.png';
import tanusree from '../assets/team/tanusree.png';
import viknesh from '../assets/team/viknesh.png';
import uvaish from '../assets/team/uvaish.jpg';
import aravind from '../assets/team/aravind.jpg';
import harshni from '../assets/team/harshni.jpg';
import ranesh from '../assets/team/ranesh.jpg';
import karthika from '../assets/team/karthika.jpg';
import nivedha from '../assets/team/nivedha.jpeg';
import ritesh from '../assets/team/ritesh.png';
import mullapudi from '../assets/team/mullapudi.jpeg';
import keerthipriya from '../assets/team/keerthi headshot ieeecs - KEERTHIPRIYA T 240701258.jpg';
import thivyaa from '../assets/team/thivyaa.jpg';
import aditya from '../assets/team/aditya.png';
import kaviarasi from '../assets/team/kaviarasi.png';
import mettu from '../assets/team/mettu.jpg';
import balamurugan from '../assets/team/balamurugan.jpg';
import venkat from '../assets/team/venkat.jpg';

const TeamMember = ({ name, role, image, linkedin, instagram, delay, imgPosition }) => (
    <div className="team-card" data-aos="fade-up" data-aos-delay={delay}>
        <div className="card-inner">
            <div className="member-image">
                <img src={image} alt={name} style={{ objectPosition: imgPosition || 'center center' }} />
                <div className="image-glow"></div>
            </div>
            <div className="card-info-overlay">
                <h3>{name}</h3>
                <p>{role}</p>
                <div className="team-social">
                    {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                    {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                </div>
            </div>
        </div>
    </div>
);

const Team = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            once: true
        });
    }, []);

    return (
        <div className="team-page-container">
            <Navbar />

            <section className="team-hero">
                <div className="cyber-grid"></div>
                <div className="hero-noise"></div>
                <div className="hero-content" data-aos="zoom-out">
                    <h1 className="glitch-text" data-text="OUR TEAM">
                        <span>OUR</span><span>TEAM</span>
                    </h1>
                    <p className="hero-subtitle">Meet the visionary minds driving technical excellence at IEEE REC.</p>
                </div>

                <a href="#team-main" className="hero-scroll-indicator">
                    <div className="mouse-icon">
                        <div className="wheel"></div>
                    </div>
                    <div className="scroll-metadata">
                        <span className="metadata-tag">SCAN_TEAM</span>
                        <div className="arrow-pulse">
                            <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </a>
            </section>

            <main className="team-main" id="team-main">
                <div className="team-section">
                    <h2 className="section-title">Convener</h2>
                    <div className="team-grid single">
                        <TeamMember
                            name="Dr. P. Kumar"
                            role="Convener"
                            image={pkumar}
                            linkedin="https://www.linkedin.com/in/dr-p-kumar-1129aa194/"
                            delay="100"
                        />
                    </div>
                </div>

                <div className="team-section">
                    <h2 className="section-title">Faculty Coordinators</h2>
                    <div className="team-grid">
                        <TeamMember name="Dr. S. VinodhKumar" role="Faculty Coordinator" image={vinod} linkedin="https://www.linkedin.com/in/dr-s-vinodh-kumar-79b1b0208" delay="100" />
                        <TeamMember name="Dr. N. Duraimurugan" role="Faculty Coordinator" image={duraimurugan} linkedin="https://www.linkedin.com/in/duraimurugan-n-181145ba/" delay="200" />
                        <TeamMember name="Dr. K. Anantajothi" role="Faculty Coordinator" image={anandhajodhii} linkedin="#" delay="300" />
                    </div>
                </div>

                <div className="team-section">
                    <h2 className="section-title">Office Bearers</h2>
                    <div className="team-grid">
                        <TeamMember name="Gokulasarathy P S" role="Chairman" image={gokulasarathy} linkedin="http://www.linkedin.com/in/gokula-sarathy-p-s-8343121b8" instagram="https://www.instagram.com/_mr.gokul_._/" delay="100" />
                        <TeamMember name="Himeshwar N" role="Secretary" image={himesh} linkedin="https://www.linkedin.com/in/himeshwarnagarajan/" instagram="https://www.instagram.com/himeshwar_31/" delay="200" />
                        <TeamMember name="Gokul Anand B" role="Webmaster" image={gokulanand} linkedin="https://www.linkedin.com/in/gokul-anand-b8ba612a2/" instagram="https://www.instagram.com/gokul_anand_14/" delay="300" />
                        <TeamMember name="Srivarshini S" role="Treasurer" image={srivarshini} linkedin="#" instagram="https://www.instagram.com/clara_de_sv_/" delay="400" />
                    </div>
                </div>

                <div className="team-section">
                    <h2 className="section-title">Core Members</h2>
                    <div className="team-grid">
                        <TeamMember name="Janani T" role="Design Lead" image={janani} linkedin="http://www.linkedin.com/in/janani-t-5576002a2" instagram="https://www.instagram.com/tj.2k5" delay="100" />
                        <TeamMember name="Kabilesh" role="Media Lead" image={kabilesh} linkedin="https://www.linkedin.com/in/kabilesh-p-a321842a2" instagram="https://www.instagram.com/kabi_nk_/" delay="200" />
                        <TeamMember name="Dharmaraj T" role="Content Lead" image={dharma} linkedin="https://www.linkedin.com/in/dharmaraj-thiyagaraj-4ba6062a2" instagram="https://www.instagram.com/dharmaraj__t" delay="300" />
                        <TeamMember name="Vishwa J" role="Event Lead" image={vishwa} linkedin="https://www.linkedin.com/in/vishwa-j-5019112a2" instagram="https://www.instagram.com/_vxshwa._.46_" delay="400" />
                        <TeamMember name="Kamalesh S P" role="Event Co-Lead" image={kamalesh} linkedin="https://www.linkedin.com/in/kamalesh-sp" instagram="https://www.instagram.com/kamalesh.s.p" delay="100" />
                        <TeamMember name="Jami Sai Akshaya" role="ML Lead" image={jamisaiakshaya} linkedin="https://www.linkedin.com/in/jami-sai-akshaya-8278a1275" instagram="https://www.instagram.com/jamisaiakshaya" delay="200" />
                        <TeamMember name="Ishwari RajMohan" role="App Lead" image={ishwari} linkedin="https://www.linkedin.com/in/ishwari-rajmohan-3a507b2a2" instagram="https://www.instagram.com/ishwarirajmohan" delay="300" />
                        <TeamMember name="Jayadharshini M" role="Public Relations Officer" image={jayadharsini} linkedin="https://www.linkedin.com/in/jayadharsinimathiyalagan" instagram="https://www.instagram.com/jayadharsini_18" delay="400" />
                        <TeamMember name="Ramalingam S" role="Event Team" image={ramalingam} linkedin="https://www.linkedin.com/in/ramalingamsankaranarayanan" instagram="https://www.instagram.com/tharunadithyaa" delay="100" />
                        <TeamMember name="Jayasudhan V" role="Event Team" image={jayasudhan} linkedin="https://www.linkedin.com/in/jayasudhan-v" instagram="https://www.instagram.com/sudhanmahi20" delay="200" />
                        <TeamMember name="Renith Joel R" role="Media Team" image={renith} linkedin="https://www.linkedin.com/in/renith-joel-r-r-75651b320" instagram="https://www.instagram.com/_renith_jr_" delay="300" />
                    </div>
                </div>

                <div className="team-section">
                    <h2 className="section-title">Board Members</h2>
                    <div className="team-grid">
                        <TeamMember name="Sai Prapanch.H" role="App Team" image={saiprapanch} linkedin="https://www.linkedin.com/in/sai-prapanch-h-77510a332" instagram="https://www.instagram.com/_prapanch_.06" delay="100" />
                        <TeamMember name="VENKAT BADHRINARAYANAN P V" role="App Team" image={venkatb} linkedin="https://www.linkedin.com/in/venkat-badhrinarayanan-747148264/" instagram="https://www.instagram.com/venkat__engineer/" delay="200" />
                        <TeamMember name="Balaambiga C A" role="Content Team" image={balambika} linkedin="https://www.linkedin.com/in/balaambiga-ca-46a49431a" delay="300" />
                        <TeamMember name="Neha.R.N" role="Content Team" image={neha} linkedin="https://www.linkedin.com/in/neha-r-n-6b81b5318/" instagram="https://www.instagram.com/_zeha.04/" delay="400" />
                        <TeamMember name="Vrithishree vj" role="Content Team" image={vrithi} linkedin="https://www.linkedin.com/in/vrithishree-vj-46b74132a" instagram="https://www.instagram.com/vjvs309" delay="100" />
                        <TeamMember name="Merlyn Sosa Saju" role="Design Team" image={merlyn} linkedin="https://www.linkedin.com/in/merlyn-sosa-saju-3b6a52317" instagram="https://www.instagram.com/mer_l48" delay="200" />
                        <TeamMember name="Mukesh V" role="Design Team" image={mukesh} linkedin="https://www.linkedin.com/in/mukesh-v-b4b066318" instagram="https://www.instagram.com/vmukeshh" delay="300" />
                        <TeamMember name="Nishani B" role="Design Team" image={nishani} linkedin="https://www.linkedin.com/in/nishani-b-0379b3331" instagram="https://www.instagram.com/nisha_100606" delay="400" />
                        <TeamMember name="ATHIRA M A" role="Event Team" image={athira} linkedin="https://www.linkedin.com/in/athira-m-a-b41047332" instagram="https://www.instagram.com/athira_ajitkumar" delay="100" />
                        <TeamMember name="Keerthana C" role="Event Team" image={keerthana} linkedin="https://www.linkedin.com/in/kikic-code" instagram="https://www.instagram.com/kikic681" delay="200" />
                        <TeamMember name="MRIDHULA DEVI M" role="Event Team" image={mriduladevi} linkedin="https://www.linkedin.com/in/mridhula-devi-m-123bb92a6" instagram="https://www.instagram.com/mridhu_d29" delay="300" />
                        <TeamMember name="Piraisoodan" role="Event Team" image={pirai} linkedin="https://www.linkedin.com/in/piraisoodan-r-pirai-180293331" instagram="https://www.instagram.com/_.pirai_" delay="400" />
                        <TeamMember name="Reshma" role="Event Team" image={reshma} linkedin="https://www.linkedin.com/in/reshma-alagesan-030049332" instagram="https://www.instagram.com/resh_zishu" delay="100" />
                        <TeamMember name="Shivani R J" role="Event Team" image={shivani} linkedin="https://www.linkedin.com/in/shivani-r-j-b96931331" instagram="https://www.instagram.com/shivani_x04" delay="200" />
                        <TeamMember name="Tanushri B" role="Event Team" image={tanusree} linkedin="https://www.linkedin.com/in/tanushri2" instagram="https://www.instagram.com/tan.who.shri" delay="300" />
                        <TeamMember name="vikneshkumar m.n" role="Event Team" image={viknesh} linkedin="https://www.linkedin.com/in/vikneshkumar-undefined-789537266/" instagram="https://www.instagram.com/vikneshkumar16" delay="400" />
                        <TeamMember name="Uvais hapeepullah" role="Media Team" image={uvaish} linkedin="https://www.linkedin.com/in/uvais-hapeepullah-noormohamed-410200318" instagram="https://www.instagram.com/obsc.ure07" delay="100" />
                        <TeamMember name="Aravindh Shankar R" role="ML Team" image={aravind} linkedin="https://www.linkedin.com/in/aravindh-shankar-r-09710a332" instagram="https://www.instagram.com/xohazex" delay="200" />
                        <TeamMember name="HARSHINI U" role="ML Team" image={harshni} linkedin="https://www.linkedin.com/in/harshiniudayakumar" instagram="https://www.instagram.com/_.harshini_.575" delay="300" />
                        <TeamMember name="RANNESH KHUMAR B R" role="ML Team" image={ranesh} linkedin="https://www.linkedin.com/in/rannesh-khumar-b-r-507377289" instagram="https://www.instagram.com/ranneshkhumar07" delay="400" />
                        <TeamMember name="Kaarthika S" role="PR Team" image={karthika} linkedin="https://www.linkedin.com/in/kaarthika-s-613ab2304" instagram="https://www.instagram.com/k__rthik_" delay="100" />
                        <TeamMember name="Nivedithaa S" role="PR Team" image={nivedha} linkedin="https://www.linkedin.com/in/nivedithaa-s" instagram="https://www.instagram.com/nivedithaaaaaaaaa" delay="200" />
                        <TeamMember name="Ritesh S" role="PR Team" image={ritesh} linkedin="https://www.linkedin.com/in/ritesh-sivakumar-667467330" instagram="https://www.instagram.com/riteshsivakumar" delay="300" />
                        <TeamMember name="Sreyaskari Mullapudi" role="PR Team" image={mullapudi} linkedin="https://www.linkedin.com/in/sreyaskari-mullapudi-969aab384" instagram="https://www.instagram.com/sreya_m05" delay="400" />
                        <TeamMember name="T KEERTHI PRIYA" role="PR Team" image={keerthipriya} linkedin="https://www.linkedin.com/in/keerthipriyat" instagram="https://www.instagram.com/_.kiki.xoxo" delay="100" />
                        <TeamMember name="Thivyaa P" role="PR Team" image={thivyaa} linkedin="https://www.linkedin.com/in/thivyaa-padmanaban-b62211318" instagram="https://www.instagram.com/thivyaabtw._" delay="200" />
                        {/* <TeamMember name="Adhitya S" role="Web Team" image={aditya} linkedin="http://www.linkedin.com/in/adithyadevcoder" instagram="https://www.instagram.com/__adith_ya.__s/" delay="300" /> */}
                        <TeamMember name="Kaviarasi M" role="Web Team" image={kaviarasi} linkedin="https://www.linkedin.com/in/kaviarasi-m-16170132b" instagram="https://www.instagram.com/kaviarasi018" delay="400" />
                        <TeamMember name="Mettu Mani Chandhan" role="Web Team" image={mettu} linkedin="https://www.linkedin.com/in/mettu-mani-chandhan-sai-993b5b32a/" instagram="https://www.instagram.com/mani_chandhan_sai/" delay="100" />
                        <TeamMember name="S.Balumurugan" role="Web Team" image={balamurugan} linkedin="https://www.linkedin.com/in/balamurugan-s-18229732b" instagram="https://www.instagram.com/balamurugan_93931" delay="200" imgPosition="center 75%" />
                        <TeamMember name="VENKAT PRASHAD A" role="Web Team" image={venkat} linkedin="https://www.linkedin.com/in/v3nk47/" instagram="https://www.instagram.com/v3nk47/" delay="300" />
                    </div>
                </div>
            </main>

            <footer className="copyright-footer">
                &copy; 2025 IEEE Computer Society — Rajalakshmi Engineering College
            </footer>
        </div >
    );
};

export default Team;
