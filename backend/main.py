from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://postgres:282003@localhost:5432/crud_db;"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

class ProjectCreate(BaseModel):
    name: str
    description: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend funcionando"}

@app.get("/projects")
def get_projects(page: int = 1, limit: int = 5):
    if page < 1 or limit < 1:
        raise HTTPException(
            status_code=400,
            detail="page y limit deben ser mayores a 0"
        )

    db = SessionLocal()

    skip = (page - 1) * limit

    projects = (
        db.query(Project)
        .offset(skip)
        .limit(limit)
        .all()
    )

    total = db.query(Project).count()

    result = [
        {"id": p.id, "name": p.name, "description": p.description}
        for p in projects
    ]

    db.close()

    return {
        "data": result,
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": max(1, (total + limit - 1) // limit)
    }

@app.post("/projects")
def create_project(project: ProjectCreate):
    db = SessionLocal()
    new_project = Project(name=project.name, description=project.description)
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    db.close()

    return {
        "id": new_project.id,
        "name": new_project.name,
        "description": new_project.description,
    }

@app.put("/projects/{project_id}")
def update_project(project_id: int, project: ProjectCreate):
    db = SessionLocal()
    existing = db.query(Project).filter(Project.id == project_id).first()

    if not existing:
        db.close()
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    existing.name = project.name
    existing.description = project.description
    db.commit()
    db.refresh(existing)
    db.close()

    return {
        "id": existing.id,
        "name": existing.name,
        "description": existing.description,
    }

@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    db = SessionLocal()
    existing = db.query(Project).filter(Project.id == project_id).first()

    if not existing:
        db.close()
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    db.delete(existing)
    db.commit()
    db.close()

    return {"message": "Proyecto eliminado"}






# @app.get("/test-db")
# def test_db():
#     with engine.connect() as connection:
#         result = connection.execute(text("Select 1"))
#         return {"database": "Conectada", "result": result.scalar()}