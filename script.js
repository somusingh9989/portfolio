/* script.js */
$(document).ready(function () {

    // Smooth Scrolling for anchor links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Offset for sticky header
            }, 800);
        }
    });

    // Sticky Navbar Logic (Adding shadow on scroll)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }

        // Active Link Highlighting on Scroll
        var scrollDistance = $(window).scrollTop() + 100;

        $('section').each(function (i) {
            if ($(this).position().top <= scrollDistance) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link').eq(i).addClass('active');
            }
        });
    });

    // Reveal Animations on Scroll (Simple Fade-in)
    // Adding a class 'visible' when elements come into view
    // (CSS for this would typically be added, effectively utilizing the AOS library concept but manually using jQuery if preferred, 
    // but here we used Bootstrap/CSS transitions mostly. Let's add a small manual trigger if needed, or rely on hover effects).

    // Optional: Add simple fade-in for sections
    $(window).scroll(function () {
        $('.glass-card').each(function () {
            var bottom_of_object = $(this).offset().top + 50;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).animate({ 'opacity': '1' }, 500);
            }
        });
    });

    // Theme Toggle
    $('#theme-toggle').click(function () {
        $('body').toggleClass('dark-mode');

        var icon = $(this).find('i');
        if ($('body').hasClass('dark-mode')) {
            icon.removeClass('bi-moon-fill').addClass('bi-sun-fill');
            $(this).removeClass('btn-light').addClass('btn-dark');
        } else {
            icon.removeClass('bi-sun-fill').addClass('bi-moon-fill');
            $(this).removeClass('btn-dark').addClass('btn-light');
        }
    });
    // Set Current Year
    $('#currentYear').text(new Date().getFullYear());

    // Calculate Dynamic Experience (Based on Start Date: August 2023)
    var startDate = new Date('2023-08-01');
    var currentDate = new Date();
    var diffMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    var diffYears = Math.floor(diffMonths / 12);
    $('#dynamic-experience').text(diffYears > 0 ? diffYears : 1);

    // Calculate Dynamic Projects
    var projectCount = $('#projects .row.g-4 > div').length;
    if (projectCount > 0) {
        $('#dynamic-projects').text(projectCount);
    }

    // Contact Form Submit Logic
    $('#contactForm').submit(function (e) {
        e.preventDefault();
        
        var name = $('#contactName').val();
        var email = $('#contactEmail').val();
        var message = $('#contactMessage').val();
        
        var bodyMsg = "Hello Saumya,\n\nYou have a new message from your portfolio.\n\n" +
                      "Name: " + name + "\n" +
                      "Email: " + email + "\n" +
                      "Message: \n" + message;

        // WhatsApp trigger
        var whatsappUrl = "https://wa.me/918948092963?text=" + encodeURIComponent(bodyMsg);
        window.open(whatsappUrl, '_blank');
        
        // Email trigger
        var mailtoUrl = "mailto:saumyasingh76520@gmail.com?subject=New Contact Message from " + encodeURIComponent(name) + "&body=" + encodeURIComponent(bodyMsg);
        window.location.href = mailtoUrl;

        // Clear the form
        this.reset();
    });
});
