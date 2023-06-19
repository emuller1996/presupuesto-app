import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const navigate = useNavigate();
  const [listArticles, setListArticles] = useState([]);
  const [loading, setLoading] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/articles",
        { article: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(result);
      getArticleAll();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleAll();
  }, []);

  const getArticleAll = async () => {
    try {
      const result = await axios.get("http://localhost:4000/articles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(result.data);
      setListArticles(result.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <>
      <div class="mt-5">
        <div class="card text-muted bg-light">
          <div class="card-body">
            <h4 class="card-title">Articles</h4>

            <div className="mb-5">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Create Article
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="mb-3">
                          <label for="" class="form-label">
                            Title
                          </label>
                          <input
                            class="form-control"
                            {...register("title", { required: true })}
                          />
                        </div>
                        <div class="mb-3">
                          <label for="" class="form-label">
                            Body
                          </label>
                          <input
                            class="form-control"
                            {...register("body", { required: true })}
                          />
                        </div>
                        <div class="mb-3">
                          <input
                            className="btn btn-success"
                            type="submit"
                            value="GUARDAR"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul class="list-group list-group-numbered">
              {listArticles &&
                listArticles.map((a) => (
                  <li class="list-group-item">
                    {a.title} - {a.body}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
