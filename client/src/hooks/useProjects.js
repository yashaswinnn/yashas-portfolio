import { useState, useEffect } from 'react';
import { projectsApi } from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await projectsApi.getAll();
      setProjects(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const addProject = async (projectData) => {
    const res = await projectsApi.create(projectData);
    setProjects((prev) => [res.data, ...prev]);
    return res.data;
  };

  const updateProject = async (id, projectData) => {
    const res = await projectsApi.update(id, projectData);
    setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    return res.data;
  };

  const deleteProject = async (id) => {
    await projectsApi.delete(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return { projects, loading, error, refetch: fetchProjects, addProject, updateProject, deleteProject };
}
