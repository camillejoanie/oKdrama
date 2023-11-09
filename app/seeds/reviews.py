from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        user_id=1,
        drama_id=3,
        review="One of my favorite dramas! The acting and characters are so funny. Made me both cry and laugh so many times!",
        hearts=5,
        created_at=datetime(2023, 11, 7)
    )
    db.session.add(review1)

    review2 = Review(
        user_id=2,
        drama_id=1,
        review="This drama is so funny! I love the two main characters together",
        hearts=5,
        created_at=datetime(2023, 11, 7)
    )
    db.session.add(review2)

    review3 = Review(
        user_id=3,
        drama_id=1,
        review="I rewatched this so many times! No wonder they made a spin-off, this show is amazing!",
        hearts=4,
        created_at=datetime(2023, 11, 7)
    )
    db.session.add(review3)

    review4 = Review(
        user_id=2,
        drama_id=5,
        review="This drama made me cry until I couldn't breathe. Wish I could rewind time so I could watch it for the first time again.",
        hearts=5,
        created_at=datetime(2023, 11, 7)
    )
    db.session.add(review4)

    review5 = Review(
        user_id=1,
        drama_id=5,
        review="The scenes with the prime minister get boring, but the overall storyline is unique and really touched me.",
        hearts=4,
        created_at=datetime(2023, 11, 7)
    )
    db.session.add(review5)
    
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
    
    