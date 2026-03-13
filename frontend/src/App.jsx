import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const API_URL = "http://127.0.0.1:8000";

  const fetchProjects = async (currentPage = page) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${API_URL}/projects?page=${currentPage}&limit=${limit}`
      );

      if (!res.ok) throw new Error("Error al cargar proyectos");

      const data = await res.json();
      setProjects(data.data);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setError("");

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/projects/${editingId}`
        : `${API_URL}/projects`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error("No se pudo guardar el proyecto");

      setName("");
      setDescription("");
      setEditingId(null);

      fetchProjects(page);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (project) => {
    setName(project.name);
    setDescription(project.description);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("No se pudo eliminar el proyecto");

      
      const resAfterDelete = await fetch(
        `${API_URL}/projects?page=${page}&limit=${limit}`
      );
      const dataAfterDelete = await resAfterDelete.json();

      
      if (dataAfterDelete.data.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        fetchProjects(page);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>CRUD DE PROYECTOS</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
          }}
        />

        <button type="submit">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && projects.length === 0 && <p>No hay proyectos.</p>}

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{project.name}</h3>
          <p>{project.description}</p>

          <button
            onClick={() => handleEdit(project)}
            style={{ marginRight: "10px" }}
          >
            Editar
          </button>

          <button onClick={() => handleDelete(project.id)}>
            Eliminar
          </button>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || loading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;