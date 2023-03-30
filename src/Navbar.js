import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
  <div class="container-xl">
    {/* <!-- Logo --> */}
    <a class="navbar-brand" href="#">
        <h4>Personate</h4>
    </a>
    {/* <!-- Navbar toggle --> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    {/* <!-- Collapse --> */}
    <div class="collapse navbar-collapse" id="navbarCollapse">
      {/* <!-- Nav --> */}
      <div class="navbar-nav mx-lg-auto">
        <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
        <a class="nav-item nav-link" href="#">Product</a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#">Pricing</a>
      </div>
      {/* <!-- Right navigation --> */}
      <div class="navbar-nav ms-lg-4">
        <a class="nav-item nav-link" href="#">Sign in</a>
      </div>
      {/* <!-- Action --> */}
      <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
        <a href="#" class="btn btn-sm btn-primary w-full w-lg-auto">
          Register
        </a>
      </div>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar