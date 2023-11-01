from app.models import db, Actor, environment, SCHEMA
from sqlalchemy import text

def seed_actors():
    actor1 = Actor(
        user_id=1,
        actor_name="Park Hyung-Sik",
        actor_image="https://i.mydramalist.com/ZXz4J_2f.jpg",
        debut_year=2010,
        bio="Park Hyung-sik is a South Korean singer and actor born on November 16, 1991. He is known for being a member of the South Korean boy group ZE:A. His acting projects include the television dramas Strong Woman Do Bong-soon and Suits."
    )
    db.session.add(actor1)

    actor2 = Actor(
        user_id=1,
        actor_name="Nam Joo-Hyuk",
        actor_image="https://i.mydramalist.com/250rk_5f.jpg",
        debut_year=2014,
        bio="Nam Joo-Hyuk is a South Korean model and actor under the agency Management SOOP. He was born in Busan, South Korea."
    )
    db.session.add(actor2)
    
    actor3 = Actor(
        user_id=2,
        actor_name="Park Seo-Joon",
        actor_image="https://asset-2.tstatic.net/style/foto/bank/images/aktor-korea-selatan-park-seo-joon.jpg",
        debut_year=2011,
        bio="Park Seo Joon is a South Korean actor managed by Awesome Entertainment. He completed his military service in 2010 before making his debut in 2011 in Bang Yong Guk's music video 'I Remember.'"
    )
    db.session.add(actor3)
    
    actor4 = Actor(
        user_id=2,
        actor_name="Park Bo-Gum",
        actor_image="https://asianwiki.com/images/a/a1/Park_Bo-Gum-Coin_Locker_Girl-GV.jpg",
        debut_year=2011,
        bio="Park Bo Gum is a South Korean actor, singer, and musician currently with THEBLACKLABEL. He had previously been with Blossom Entertainment for ten years."
    )
    db.session.add(actor4)
    
    actor5 = Actor(
        user_id=3,
        actor_name="Kim Soo-Hyun",
        actor_image="https://img.etimg.com/photo/97804886/97804886.jpg",
        debut_year=2007,
        bio="Kim Soo Hyun is a South Korean actor managed by GoldMedalist. He debuted in the drama 'Kimchi Cheese Smile' (김치 치즈 스마일) in 2007."
    )
    db.session.add(actor5)

    db.session.commit()

def undo_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actors"))

    db.session.commit()
    