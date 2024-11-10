<script>
	import { page } from '$app/stores';
import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    
} from '@sveltestrap/sveltestrap';
import { onMount, onDestroy } from 'svelte';

    $: activeLink = $page.url.pathname.includes('blog') ? 'blog' : 'home';
    let isSticky = false;
    let isHome = activeLink === 'home';

    onMount(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                isSticky = true;
            } else {
                isSticky = false;
            }
        };

        window.addEventListener('scroll', handleScroll);
        if (!activeLink) {
            handleScroll()
        }
    });
</script>

<nav class={`navbar navbar-expand custom-nav navbar-light fixed-top ${isSticky ? 'stickyadd' : ''}`}>
    <Container >
        <div class="navbar-collapse" id="navbarNav">
            <Nav class="navbar-nav ms-auto" id="main_nav">
                <NavItem>
                    <a class={`nav-link ${activeLink === "home" ? "active" : "blog"}`} href="/">Home</a>
                </NavItem>
                <NavItem> 
                    <a class={`nav-link ${activeLink === "blog" ? "active" : ""}`} href="/blog">Blog</a>
                </NavItem>
            </Nav>
        </div>
    </Container>
</nav>